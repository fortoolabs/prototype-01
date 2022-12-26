import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import { Popover } from '@headlessui/react'

function AuthControl() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <Popover className="relative">
      <Popover.Button>avatar</Popover.Button>

      <Popover.Panel
        className={[
          'absolute',
          'left-1/2 z-10',
          'w-96 max-w-sm',
          '-translate-x-1/2 transform',
          'p-4', // px-4 sm:px-0',
          'lg:max-w-3xl',
          'rounded-lg border-2 bg-white',
        ].join(' ')}
      >
        {!session ? (
          <Auth
            redirectTo={process.env.NEXT_PUBLIC_VERCEL_URL}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['github', 'gitlab']}
            theme="light"
          />
        ) : (
          <div>
            <div>
              <button
                type="button"
                className={[
                  'inline-flex items-center',
                  'rounded-md border border-transparent',
                  'bg-indigo-600',
                  'px-4 py-2',
                  'text-sm font-medium text-white',
                  'shadow-sm',
                  'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                ].join(' ')}
                onClick={() => supabase.auth.signOut()}
              >
                Sign Out
              </button>
            </div>
            <div>
              <pre className="max-h-36 p-2 rounded-md overflow-auto bg-gray-100">
                {JSON.stringify(session.user, null, 2)}
              </pre>
            </div>
            <div>
              <span className="bg-gray-100 p-2 rounded-md">token_type</span>{' '}
              <code>{session.token_type}</code>
            </div>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  )
}

export default AuthControl
