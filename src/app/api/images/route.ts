import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all'; // 'logo', 'banner', or 'all'
    
    const images: Array<{
      filename: string;
      path: string;
      url: string;
      type: 'logo' | 'banner';
      size?: number;
      lastModified?: Date;
    }> = [];

    // Define directories to scan
    const directories = [
      { 
        path: 'public/logos', 
        type: 'logo' as const 
      },
      { 
        path: 'public/media', 
        type: 'banner' as const 
      },
    ];

    for (const dir of directories) {
      try {
        // Skip if we're filtering by type and this directory doesn't match
        if (type !== 'all' && dir.type !== type) {
          continue;
        }

        const files = await readdir(dir.path);
        
        for (const file of files) {
          // Only include image files
          if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)) {
            const filePath = join(dir.path, file);
            const stats = await stat(filePath);
            
            images.push({
              filename: file,
              path: filePath,
              url: `/${dir.path.replace('public/', '')}/${file}`,
              type: dir.type,
              size: stats.size,
              lastModified: stats.mtime,
            });
          }
        }
      } catch (error) {
        // Directory doesn't exist or can't be read - skip it
      }
    }

    // Sort by last modified (newest first)
    images.sort((a, b) => {
      if (!a.lastModified || !b.lastModified) return 0;
      return b.lastModified.getTime() - a.lastModified.getTime();
    });

    return NextResponse.json({
      images,
      total: images.length,
      types: {
        logo: images.filter(img => img.type === 'logo').length,
        banner: images.filter(img => img.type === 'banner').length,
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
} 