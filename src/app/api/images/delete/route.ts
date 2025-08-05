import { NextRequest, NextResponse } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    const type = searchParams.get('type'); // 'logo' or 'banner'
    
    if (!filename || !type) {
      return NextResponse.json(
        { error: 'Missing filename or type parameter' },
        { status: 400 }
      );
    }

    // Determine directory based on type
    let directory: string;
    if (type === 'logo') {
      directory = process.env.UPLOAD_LOGOS_DIR?.replace('/public/', 'public/') || 'public/logos';
    } else if (type === 'banner') {
      directory = process.env.UPLOAD_MEDIA_DIR?.replace('/public/', 'public/') || 'public/media';
    } else {
      return NextResponse.json(
        { error: 'Invalid type. Must be "logo" or "banner"' },
        { status: 400 }
      );
    }

    // Create file path
    const filePath = join(directory, filename);

    try {
      // Delete the file
      await unlink(filePath);
      
      return NextResponse.json({
        success: true,
        message: `File ${filename} deleted successfully`,
        deletedFile: filename,
        type: type,
      });
    } catch (error) {
      return NextResponse.json(
        { error: 'File not found or could not be deleted' },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
} 