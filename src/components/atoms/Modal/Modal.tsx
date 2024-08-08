import React from 'react'
import ReactModal from 'react-modal'
import { clsx } from 'clsx'
import { CloseIcon } from '../Icons/CloseIcon'

const Modal: React.FC<ReactModal.Props & { closeModal?: () => void; title?: string; bgColor: string }> = ({
  title,
  closeModal,
  children,
  bgColor = 'bg-neutral-400',
  ...props
}) => {
  return (
    <ReactModal
      {...props}
      className={clsx(
        'absolute top-[180px] left-1/2 w-[500px] max-w-[calc(100%_-_32px)] -translate-x-1/2 overflow-hidden rounded-3xl outline-none ',
        props.className
      )}
      overlayClassName={props.overlayClassName || 'fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.5)] z-[10]'}
    >
      {title && (
        <div className={clsx('flex justify-between p-4 border-b-[2px]', bgColor)}>
          <h2 className='text-3xl font-semibold text-neutral-100'>{title}</h2>
          <CloseIcon className='cursor-pointer text-neutral-100' onClick={closeModal} />
        </div>
      )}
      <div className={clsx('text-neutral-100', bgColor)}>{children}</div>
    </ReactModal>
  )
}

export default Modal
