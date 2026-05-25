declare module 'lucide-react' {
  import * as React from 'react'

  type IconProps = React.SVGProps<SVGSVGElement> & { size?: number | string }

  // Common icons (add more as needed) - fallback to React.FC
  export const User: React.FC<IconProps>
  export const Home: React.FC<IconProps>
  export const CircleCheck: React.FC<IconProps>

  // Generic export for any icon name
  export const ChevronRight: React.FC<IconProps>
  export const ChevronLeft: React.FC<IconProps>

  const _default: { [key: string]: React.FC<IconProps> }
  export default _default
}
