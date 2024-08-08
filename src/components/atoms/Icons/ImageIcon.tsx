export function ImageIcon(props: React.SVGAttributes<unknown>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' width='1.75em' height='1.75em' {...props}>
      <path
        fill='green'
        d='M464 448H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h416c26.5 0 48 21.5 48 48v288c0 26.5-21.5 48-48 48zM112 120c-30.9 0-56 25.1-56 56s25.1 56 56 56 56-25.1 56-56-25.1-56-56-56zM64 384h384V272l-87.5-87.5c-4.7-4.7-12.3-4.7-17 0L208 320l-55.5-55.5c-4.7-4.7-12.3-4.7-17 0L64 336v48z'
      />
    </svg>
  )
}
