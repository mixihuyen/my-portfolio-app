"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaGithub, FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const socials = [
    {
      name: "github",
      icon: <FaGithub className="w-5 h-5 text-gray-800" />,
      link: "https://github.com/mixihuyen",
    },
    {
      name: "facebook",
      icon: <FaFacebook className="w-5 h-5 text-blue-600" />,
      link: "https://www.facebook.com/lehuyen23vn",
    },
    {
      name: "tiktok",
      icon: <FaTiktok className="w-5 h-5 text-black" />,
      link: "https://www.tiktok.com/@mixihuyen",
    },
    {
      name: "instagram",
      icon: <FaInstagram className="w-5 h-5 text-pink-600" />,
      link: "https://www.instagram.com/mixihuyen/",
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-12 bg-green-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 mb-3">
            Contact
          </h2>
          <div className="w-16 h-1 bg-green-500 mx-auto"></div>
          <p className="mt-3 text-base sm:text-lg text-green-700 max-w-xl mx-auto">
            Have a project to discuss or need advice on mobile app development?
            Get in touch!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-4">
              Contact Information
            </h3>

            <div className="space-y-4 w-full">
  {[
    {
      icon: <Mail className="h-5 w-5 text-green-600" />,
      label: "Email",
      value: "lehuyen23vn@gmail.com",
      href: "mailto:lehuyen23vn@gmail.com",
    },
    {
      icon: <Phone className="h-5 w-5 text-green-600" />,
      label: "Phone",
      value: "+84 971 625 203",
      href: "tel:+84971625203",
    },
    {
      icon: <MapPin className="h-5 w-5 text-green-600" />,
      label: "Location",
      value: "Danang City, Vietnam",
      href: "#",
    },
  ].map((item) => (
    <a
      key={item.label}
      href={item.href}
      className="flex items-center space-x-2 p-3  w-full"
    >
      <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
        {item.icon}
      </div>
      <div className="text-left">
        <h4 className="text-base font-medium text-green-800">
          {item.label}
        </h4>
        <p className="text-green-700 text-sm">{item.value}</p>
      </div>
    </a>
  ))}
</div>

            <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mt-6 mb-3">
              Follow Me
            </h3>
            <div className="flex space-x-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-4 text-center md:text-left">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="border-green-200 focus:border-green-500 focus:ring-green-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[100px] sm:min-h-[120px] border-green-200 focus:border-green-500 focus:ring-green-500 text-sm sm:text-base"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2 text-sm sm:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </Button>

              {submitSuccess && (
                <div className="p-3 bg-green-100 text-green-700 rounded-md text-center text-sm sm:text-base">
                  Your message has been sent successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}