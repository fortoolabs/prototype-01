// https://tailwindui.com/components/application-ui/forms/toggles#component-bcaf782196186836b6ea686e7096e734
// Icons from https://heroicons.com/
import { Switch } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export type ToggleSwitchProps = {
  isEnabled: boolean
  /*eslint no-unused-vars: ["error", {"args": "none"}]*/
  setEnabled: (params: boolean) => any
  icons?: { enabled: JSX.Element; disabled: JSX.Element }
}

// FIX: Broken: When toggling on, the icon fades out
export default function Example({
  isEnabled,
  setEnabled,
  icons,
}: ToggleSwitchProps) {
  const getIconComponents = (): JSX.Element | undefined => {
    if (icons === undefined) {
      return
    } else {
      const { enabled, disabled } = icons
      return (
        <>
          <span
            className={classNames(
              isEnabled
                ? 'opacity-0 ease-out duration-100'
                : 'opacity-100 ease-in duration-200',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            {disabled}
          </span>
          <span
            className={classNames(
              isEnabled
                ? 'opacity-100 ease-in duration-200'
                : 'opacity-0 ease-out duration-100',
              'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity',
            )}
            aria-hidden="true"
          >
            {enabled}
          </span>
        </>
      )
    }
  }

  return (
    <Switch
      checked={isEnabled}
      onChange={setEnabled}
      className={classNames(
        isEnabled ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          isEnabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
        )}
      >
        {icons && getIconComponents()}
      </span>
    </Switch>
  )
}
