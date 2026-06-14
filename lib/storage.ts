import * as fs from 'fs';
import * as path from 'path';

// Local-only image upload — no Supabase dependency required.
export async function uploadImage(
  file: File,
  folder: 'logos' | 'menu-items' = 'menu-items'
): Promise<string> {
  const fileExtension = file.name.split('.').pop() || 'jpg';
  const fileName = `${folder}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}.${fileExtension}`;

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    return `/uploads/${fileName}`;
  } catch (error) {
    console.error('Local file upload failed:', error);
    throw new Error('Failed to upload image file.');
  }
}
