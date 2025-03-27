import { Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import "../Banner/style.css";
import Link from "next/link";

export default function Banner() {
  return (
    <section className={`banner w-full bg-[#F38200] rounded-xl py-14`}>
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white sm:text-[#CB4C21] mb-2">#MR BURGUER</h1>
        <p className="text-white sm:text-lg mb-6">
          Atendimento de Segunda a Sábado {" "}
          <br className="sm:hidden" />
          das 18h às 23h
        </p>

        <div className="flex justify-center space-x-2 right-2 bottom-2">
          <Link
            href="https://wa.me/51985376531"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <FaWhatsapp size={24} />
          </Link>
          <Link
            href="https://instagram.com/mrburguer"
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <Instagram size={24} className="text-white" />
          </Link>
        </div>
      </div>
    </section>
  )
}

