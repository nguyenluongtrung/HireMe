import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">HireMe</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Nền tảng tuyển dụng và tối ưu hóa CV hàng đầu, giúp bạn chinh phục nhà tuyển dụng với công nghệ AI tiên tiến.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  Tìm việc làm
                </Link>
              </li>
              <li>
                <Link href="/cv-improvement" className="hover:text-white transition-colors">
                  Nâng cấp CV AI
                </Link>
              </li>
              <li>
                <Link href="/interview-practice" className="hover:text-white transition-colors">
                  Luyện phỏng vấn
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition-colors">
                  Mẫu CV chuyên nghiệp
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Về HireMe</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Bảng giá
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <Mail size={16} />
                <span>support@hireme.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} />
                <span>+84 905 870 827</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="shrink-0 mt-1" />
                <span>K45/122 đường K20, Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} HireMe. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
