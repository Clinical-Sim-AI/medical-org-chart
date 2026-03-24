export const metadata = {
  title: "Academic Medical Center Org Chart",
  description:
    "Interactive organizational chart for a typical large academic medical center",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#ffffff" }}>{children}</body>
    </html>
  );
}
