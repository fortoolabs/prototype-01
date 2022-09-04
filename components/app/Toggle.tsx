// https://tailwindui.com/components/application-ui/forms/toggles#component-bcaf782196186836b6ea686e7096e734
// Icons from https://heroicons.com/
import { Switch } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export type ToggleSwitchProps = {
  feature?: string
  isEnabled: boolean
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  setEnabled: (params: boolean) => void
  enabledIcon?: React.ElementType
  disabledIcon?: React.ElementType
  activeColor?: 'slate' | 'red' | 'pink' | 'blue' | 'green' | 'yellow'
}

export default function Toggle({
  feature,
  isEnabled,
  setEnabled,
  enabledIcon: EnabledIcon,
  disabledIcon: DisabledIcon,
  activeColor,
}: ToggleSwitchProps) {
  return (
    <Switch
      checked={isEnabled}
      onChange={setEnabled}
      className={classNames(
        isEnabled
          ? activeColor
            ? `bg-${activeColor}-400`
            : 'bg-gray-400'
          : 'bg-gray-200',
        'relative inline-flex flex-shrink-0',
        'h-6 w-11',
        'border-2 border-transparent rounded-full',
        'cursor-pointer',
        'transition-colors ease-in-out duration-200',
        'focus:outline-none',
        'focus:ring-2 focus:ring-offset-2',
        activeColor ? `focus:ring-${activeColor}-400` : '',
      )}
    >
      <span className="sr-only">
        {/* TODO: i18n-ize */}
        {feature ? `Toggle ${feature}` : 'Toggle'}
      </span>
      <span
        className={classNames(
          isEnabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none',
          'relative inline-block',
          'h-5 w-5',
          'rounded-full',
          'bg-white shadow',
          'transform ring-0 transition ease-in-out duration-200',
        )}
      >
        {DisabledIcon && (
          <span
            className={classNames(
              isEnabled
                ? 'opacity-0 ease-out duration-100'
                : 'opacity-100 ease-in duration-200',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            <DisabledIcon className="h-3 w-3" />
          </span>
        )}
        {EnabledIcon && (
          <span
            className={classNames(
              isEnabled
                ? 'opacity-100 ease-in duration-200'
                : 'opacity-0 ease-out duration-100',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            <EnabledIcon className="h-3 w-3" />
          </span>
        )}
      </span>
    </Switch>
  )
}
