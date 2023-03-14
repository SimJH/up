import React from 'react';
import { styled, View } from 'dripsy';
import { Modal } from 'src/components';
import { Button, Text } from 'src/designs';
import { t } from 'src/translations';

import type { ModalProps } from 'src/components';

export interface QuestDeleteModalProps extends Omit<ModalProps, 'title'> {
  onDelete: () => void;
}

const Content = styled(View)({
  gap: '$04',
});

const Message = styled(Text)({
  textAlign: 'center',
});

export function QuestDeleteModal({
  visible,
  onClose,
  onDelete,
}: QuestDeleteModalProps): JSX.Element {
  return (
    <Modal onClose={onClose} title={t('title.delete_quest')} visible={visible}>
      <Content>
        <Message variant="text.primary">{t('message.delete_quest')}</Message>
        <Message variant="text.secondary">
          {`(${t('message.delete_quest_guide')})`}
        </Message>
        <Button color="$red" onLongPress={onDelete}>
          {t('label.delete_confirm')}
        </Button>
      </Content>
    </Modal>
  );
}
