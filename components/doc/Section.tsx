import { useState, PropsWithChildren, HTMLAttributes } from 'react'

import CaretDown from 'components/icons/CaretDown'

export type SectionProps = {}

function Section({
  children,
  className,
}: PropsWithChildren<SectionProps> & HTMLAttributes<'section'>) {
  const [show, setShow] = useState(true)

  const handleClick = () => {
    setShow((current) => !current)
  }

  const shownClasses =
    'max-h-[1000rem] transition-[max-height] duration-500 ease-in'
  const hiddenClasses = 'max-h-0 transition-[max-height] duration-300 ease-out'
  const arrowClass = 'h-4 w-4 hover:fill-c-blue-hover transition'
  return (
    <section className={`${className}`}>
      <div className="flex items-center gap-1 mb-3">
        <button className="shrink-0" onClick={handleClick}>
          {' '}
          <CaretDown
            className={`${arrowClass} ${show ? '' : '-rotate-90 transition'}`}
          />
        </button>
        <h1 className="text-xl font-bold">Dummy Heading</h1>
      </div>

      <div
        className={`${className} ${
          show ? shownClasses : hiddenClasses
        } overflow-hidden pl-2`}
      >
        {children}
      </div>
    </section>
  )
}

export default Section

{
  /* <section className={`${className} px-3 relative`}>
<button className="absolute top-1 -left-2" onClick={handleClick}>
  {' '}
  <CaretDown className={`${arrowClass}`} />
</button>
<div
  className={`${className} ${clip ? clippedClasses : notClippedClasses}`}
>
  {children}
</div>
</section> */
}
