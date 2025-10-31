# CutLink - Modern URL Shortener

CutLink is a sleek and efficient URL shortener built with Next.js, MongoDB, and TailwindCSS. This modern web application allows users to quickly shorten long URLs into manageable, shareable links.

## 🚀 Features

- **Quick URL Shortening**: Instantly create shortened versions of long URLs
- **Custom Short URLs**: Create personalized short URLs (if available)
- **Modern UI**: Clean and responsive interface built with TailwindCSS
- **Fast Performance**: Built on Next.js with Turbopack for optimal speed
- **Reliable Storage**: MongoDB backend for secure and efficient data storage

## 💻 Tech Stack

- **Frontend**: React 19, Next.js 15
- **Styling**: TailwindCSS 4
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Performance**: Turbopack

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Code-Script/cutlink.git
   cd cutlink
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 Usage

1. Navigate to the homepage
2. Click "Try now" to access the URL shortening page
3. Enter your long URL
4. (Optional) Customize your short URL
5. Click "Generate" to create your shortened URL
6. Copy and share your new short URL!

## 🚀 Deployment

This project can be deployed on any platform that supports Next.js applications, such as Vercel:

```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Authors

- [Code-Script](https://github.com/Code-Script)

## 🌟 Acknowledgments

- Thanks to the Next.js team for their amazing framework
- TailwindCSS for the utility-first CSS framework
- MongoDB team for the reliable database solution
