# 📦 AWS S3 File Upload & Image Reduction Backend

A complete production-ready **Node.js + Express** backend project for uploading files and compressed images to **AWS S3 Buckets** using **AWS SDK v3 (`@aws-sdk/client-s3`)** and storing metadata in **MongoDB**.

📁 **Project Root**: `s3-file-upload-backend`

---

## 🛠️ Project Structure

```text
s3-file-upload-backend/
├── index.js                  <─── Express Server Entry Point (PORT 5000)
├── .env                      <─── AWS Credentials & MongoDB Connection
├── config/
│   ├── s3.js                 <─── AWS S3 Client Setup (@aws-sdk/client-s3)
│   └── database.js           <─── MongoDB Connection Helper
├── models/
│   └── S3File.js             <─── Mongoose Model Schema (title, key, bucket, s3Url, originalSize, compressedSize, tags, email)
├── routes/
│   └── s3Routes.js           <─── Express API Routes
└── controllers/
    └── s3Controller.js       <─── S3 Upload, Sharp Compression, Presigned URL & Delete Handlers
```

---

## 🔑 Environment Variables (`.env`)

```env
PORT=5000
MONGODB_URL=mongodb://127.0.0.1:27017/s3_fileupload_db

# AWS S3 Credentials
AWS_ACCESS_KEY_ID=your_aws_access_key_here
AWS_SECRET_ACCESS_KEY=your_aws_secret_key_here
AWS_REGION=us-east-1
AWS_BUCKET_NAME=my-awesome-s3-bucket
```

---

## 🚀 API Endpoints

### 1. Upload Standard File to AWS S3
* **Route**: `POST /api/v1/s3/upload`
* **Content-Type**: `multipart/form-data`
* **Body Form Data**:
  - `file`: File binary (Image, PDF, Video, Doc)
  - `title`: String (File name/title)
  - `tags`: String (e.g. `docs,invoice`)
  - `email`: String (User email)

### 2. Compress Image & Upload to S3 (Sharp Reduction)
* **Route**: `POST /api/v1/s3/upload-reduced`
* **Content-Type**: `multipart/form-data`
* **Body Form Data**:
  - `file`: Image binary
  - `title`: String
  - `tags`: String
  - `email`: String
  - `quality`: Number (Compression quality, e.g. `60`)
* **Response**: Returns compressed URL + size savings (e.g. *"Original: 4.8 MB ➔ Compressed: 290 KB (Saved 94%)"*).

### 3. Generate Presigned S3 Download URL
* **Route**: `GET /api/v1/s3/presigned-url/:key`
* **Description**: Generates a secure, temporary presigned download link for private S3 objects (valid for 1 hour).

### 4. Delete File from S3 & MongoDB
* **Route**: `DELETE /api/v1/s3/delete/:id`
* **Description**: Deletes the file object from the AWS S3 Bucket and removes its document record from MongoDB.

### 5. Fetch All Uploaded S3 File Records
* **Route**: `GET /api/v1/s3/files`
* **Description**: Returns all S3 file records saved in MongoDB sorted by upload date.

---

## 🏃 How to Run

```bash
# Navigate to project folder
cd s3-file-upload-backend

# Install dependencies
npm install

# Start development server
npm run dev
# Server will run at http://localhost:5000
```
