import classNames from 'classnames/bind';
import Modal from '../Modal/Modal';
import styles from './Dialog.module.scss';
import Button from '../Buttons/Button/Button';
import { DialogIcon } from './DialogIcon';

const cn = classNames.bind(styles);

interface BaseDialogProps {
  message: string;
  isOpen: boolean;
  iconType?: 'warn' | 'accept' | 'delete';
}

interface AlertDialogProps extends BaseDialogProps {
  type: 'alert';
  buttonText: string;
  onClick: () => void;
}

interface ConfirmDialogProps extends BaseDialogProps {
  type: 'confirm';
  buttonText: Record<'left' | 'right', string>;
  onClick: Record<'left' | 'right', () => void>;
}

type DialogProps = AlertDialogProps | ConfirmDialogProps;

export default function Dialog({ type, isOpen, onClick, buttonText, iconType, message }: DialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <div className={cn('wrapper')}>
        <div className={cn('content-wrapper', { 'only-child': !iconType })}>
          {iconType && <DialogIcon iconType={iconType} />}
          <div className={cn('text-wrapper')}>{message}</div>
        </div>
        <div className={cn('button-wrapper')}>
          {type === 'confirm' && (
            <Button backgroundColor='background-gray-40' onClick={onClick.left} className={cn('button-left')}>
              {buttonText.left}
            </Button>
          )}
          <Button
            backgroundColor='background-primary'
            onClick={type === 'confirm' ? onClick.right : onClick}
            hoverColor='background-primary-60'
          >
            {type === 'confirm' ? buttonText.right : buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
