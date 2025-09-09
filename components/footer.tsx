"use client";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 bg-green-800 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-4 md:flex-row md:justify-between md:items-start">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold sm:text-xl">Mixi Huyen</h3>
            <p className="text-green-200 mt-1 text-sm sm:text-base">
              Mobile App Developer
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="flex items-center gap-1 text-sm sm:text-base">
              Created with{" "}
              <Heart className="h-4 w-4 text-red-400 fill-red-400" /> by Mixi
              Huyen
            </p>
            <p className="text-green-200 text-xs sm:text-sm mt-1">
              &copy; {currentYear} All rights reserved by Mixi Huyen
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}