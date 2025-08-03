import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'logo' or 'banner'
    const filename = formData.get('filename') as string;

    if (!file || !type || !filename) {
      return NextResponse.json(
        { error: 'Missing required fields: file, type, or filename' },
        { status: 400 }
      );
    }

    // Determine upload directory based on type
    let uploadDir: string;
    if (type === 'logo') {
      uploadDir = process.env.UPLOAD_LOGOS_DIR?.replace('/public/', 'public/') || 'public/logos';
    } else if (type === 'banner') {
      uploadDir = process.env.UPLOAD_MEDIA_DIR?.replace('/public/', 'public/') || 'public/media';
    } else {
      return NextResponse.json(
        { error: 'Invalid type. Must be "logo" or "banner"' },
        { status: 400 }
      );
    }

    // Ensure the directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create file path
    const filePath = join(uploadDir, filename);

    // Write file to disk
    await writeFile(filePath, buffer);

    // Return success response with file info
    return NextResponse.json({
      success: true,
      filename: filename,
      path: filePath,
      url: `/${uploadDir.replace('public/', '')}/${filename}`,
      type: type,
      size: buffer.length,
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 