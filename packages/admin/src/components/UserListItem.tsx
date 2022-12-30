import {
  Button,
  ButtonGroup,
  HStack,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { TbTrash } from 'react-icons/tb';
import { KioskRoles } from '../types/types';
import { RoleBadge } from './RoleBadge';
import { KioskUser } from '../types/users.type';
import { useAuthContext } from '../context/auth.context';

interface UserListItemProps {
  user: KioskUser;
  onEditRole: (role: KioskRoles) => void;
  onDeleteUser: () => void;
}

export function UserListItem({ user, onDeleteUser, onEditRole }: UserListItemProps) {
  const bgColor = useColorModeValue('gray.100', 'gray.600');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user: myUser } = useAuthContext();
  return (
    <HStack justifyContent='space-between' p={3} backgroundColor={bgColor} borderRadius='lg' w='100%'>
      <HStack overflow='hidden'>
        <Text isTruncated>{user.mail}</Text>
      </HStack>
      <RoleBadge role={user.role} />
      <HStack>
        <ButtonGroup>
          {myUser?.mail !== user.mail && (
            <Button variant='ghost' onClick={onOpen} colorScheme='red'>
              <TbTrash />
            </Button>
          )}
        </ButtonGroup>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Biztosan törlöd?</ModalHeader>
          <ModalFooter>
            <ButtonGroup>
              <Button
                onClick={() => {
                  onDeleteUser();
                  onClose();
                }}
                colorScheme='red'
                variant='ghost'
              >
                Törlés
              </Button>
              <Button onClick={onClose} colorScheme='red'>
                Mégse
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </HStack>
  );
}
