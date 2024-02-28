'use client';
import { TUser } from '@psu/entities';
import { FC, ReactElement, useState } from 'react';
import Avatar from 'react-avatar';
import { FaBell, FaChevronDown, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'next-auth/react';

export const Navbar: FC<{ user: TUser }> = (props): ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white cursor-pointer shadow-md p-4 items-center flex justify-between">
      <span className="text-lg font-bold">Dashboard</span>
      <div
        onClick={() => setOpen(!open)}
        className="flex gap-x-4 relative items-center"
      >
        <div className="bg-warning  w-auto h-auto rounded-lg p-2 text-black mr-4">
          <FaBell size={22} />
        </div>
        <Avatar
          name={props.user?.fullname}
          size={'40'}
          className="rounded-full w-auto h-auto"
        />
        <span className="text-lg font-medium text-black select-none">
          {props.user?.fullname}
        </span>
        <FaChevronDown
          style={{
            transform: open ? 'rotate(180deg)' : 'none',
          }}
          size={22}
        />

        {open && (
          <div className="absolute flex flex-col gap-y-1 bg-white shadow-md p-4 min-w-[300px] w-auto h-auto top-16 rounded-lg right-2">
            <div className="flex gap-x-2 items-center hover:bg-primary-50 py-2 px-1 rounded-lg">
              <FaUser />
              <span>Profile</span>
            </div>
            <div
              onClick={() => signOut()}
              className="flex gap-x-2 items-center hover:bg-primary-50 py-2 px-1 rounded-lg"
            >
              <FaSignOutAlt />
              <span>Keluar</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
