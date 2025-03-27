import { footerLinks } from "../constants"

function Footer() {
  return (
    <footer className="py-5 sm:py-10 px-10">
      <div className="screen-max-width">
        <div>
          <p className="font-semibold text-zinc-400 text-xs">
            More ways to shop: {' '}
            <span className="underline text-blue">
              Find an Apple Store
            </span>{' '}
            or {' '}
            <span className="underline text-blue">
              other retailers
            </span>  {' '} near you.
          </p>

          <p className="font-semibold text-zinc-400 text-xs">
            Or call 0998-9909-1220
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-px w-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <p className="font-semibold text-zinc-400 text-xs px-2">
            Copyright © 2024 Apple Inc. All rights reserved.
          </p>
          <div className="flex max-md:mt-4">
            {footerLinks.map((link, i) => (
              <p 
                key={i} 
                className={`relative font-semibold text-2xs sm:text-xs text-zinc-400 px-2 ${i !== footerLinks.length - 1 && 'footer-divide-right'}`}>
                  {link}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer