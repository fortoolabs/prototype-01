// TODO: @vidbina stub test
import { useState, PropsWithChildren, HTMLAttributes } from 'react'

import { FSection, FDocument } from 'core/types'
import { renderElement } from 'core/renderer'

import CaretDown from 'components/icons/CaretDown'

export type SectionProps = {
  doc?: FDocument
  data: FSection
}

// @tijan: Why don't we use a Disclosure here?
function Section({
  doc,
  data,
}: PropsWithChildren<SectionProps> & HTMLAttributes<'section'>) {
  const [show, setShow] = useState(true)

  const handleClick = () => {
    setShow((current) => !current)
  }

  const heading = data.content.find((el) => el.type === 'h')
  const content = data.content.filter((el) => el.type !== 'h')

  const shownClasses =
    'max-h-[10000rem] transition-[max-height] duration-500 ease-in'
  const hiddenClasses = 'max-h-0 transition-[max-height] duration-300 ease-out'
  const arrowClass = [
    'h-4 w-4',
    // FIXME: @tijan how do we show the caret when hovering over the heading?
    // I looked at Tailwind group but can't figure it out?
    'opacity-10',
    'fill-current hover:fill-c-blue-hover',
    'stroke-none',
    'transition',
  ].join(' ')
  // FIXME: @tijan: I can't manage to move CaretDown left of the Block
  // the overflow-hidden inside of the body div seems to be a blocker here
  return (
    <section>
      {heading && (
        <div className="relative">
          <button
            className={['absolute', 'top-6', 'h-4', 'w-4'].join(' ')}
            onClick={handleClick}
          >
            <CaretDown
              className={[arrowClass, show ? '' : '-rotate-90 transition'].join(
                ' ',
              )}
            />
          </button>
          {/* TODO: WTF to do with the key arg (2nd) below? */}
          {renderElement(heading, 'figureoutsomeid', doc)}
        </div>
      )}

      <div
        className={[
          show ? shownClasses : hiddenClasses,
          'overflow-hidden',
        ].join(' ')}
      >
        {content.flatMap((el, i) => renderElement(el, `prose-${i}`, doc))}
      </div>
    </section>
  )
}

export default Section
