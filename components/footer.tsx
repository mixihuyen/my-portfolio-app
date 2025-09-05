"use client";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-green-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Portfolio</h3>
            <p className="text-green-200 mt-2">Mobile App Developer</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="flex items-center gap-1">
              Created with{" "}
              <Heart className="h-4 w-4 text-red-400 fill-red-400" /> by Mixi
              Huyền
            </p>
            <p className="text-green-200 text-sm mt-1">
              &copy; {currentYear} All rights reserved by Mixi Huyền
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}