import React from 'react';
import { UserOutlined, HeartFilled, AppstoreFilled, FolderAddFilled } from '@ant-design/icons';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import styled from 'styled-components';

const DEFAILT_STYLE: React.CSSProperties = {
  fontSize: '1rem',
  padding: '0.75rem 1rem',
  minWidth: '10rem',
  color: 'rgba(0,0,0,0.7)',
  fontWeight: 'bold',
};

const PROFILE_ITEMS: MenuProps['items'] = [
  {
    key: '1',
    label: 'Profile',
    style: DEFAILT_STYLE,
    icon: <UserOutlined style={{ fontSize: 20 }} />,
  },
  {
    key: '2',
    label: 'My Collection',
    style: DEFAILT_STYLE,
    icon: <AppstoreFilled style={{ fontSize: 20 }} />,
  },
  {
    key: '3',
    label: 'Favorites',
    style: DEFAILT_STYLE,
    icon: <HeartFilled style={{ fontSize: 20 }} />,
  },
  {
    key: '4',
    label: 'Create',
    style: DEFAILT_STYLE,
    icon: <FolderAddFilled style={{ fontSize: 20 }} />,
  },
];

const UserProfileDropdown: React.FC = () => {
  return (
    <>
      <Hover_div>
        <Dropdown menu={{ items: PROFILE_ITEMS }}>
          <UserCustom style={{ fontSize: 25 }} />
        </Dropdown>
      </Hover_div>
    </>
  );
};

export default UserProfileDropdown;

const Hover_div = styled.div`
  cursor: pointer;
`;

const UserCustom = styled(UserOutlined)`
  &:hover {
    color: rgba(0, 0, 0, 0.7);
    transition: all 0.2s ease-in-out;
  }
`;
