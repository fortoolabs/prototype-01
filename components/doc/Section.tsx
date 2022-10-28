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
    'h-4 w-4 ',
    'fill-current stroke-none hover:fill-c-blue-hover transition',
  ].join(' ')
  // FIXME: @tijan: absolutely left-position CaretDown
  // Note that section hierarchies should be aligned along the same y-pos
  return (
    <section className={[' '].join(' ')}>
      {heading && (
        <div className="relative">
          <button className="absolute top-[40%] -left-4" onClick={handleClick}>
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
          'relative',
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
