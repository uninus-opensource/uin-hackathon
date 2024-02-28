'use client';

import { FC, ReactElement, useState } from 'react';
import { DataTable, Modal } from '@psu/web-component-organisms';
import { ColumnDef } from '@tanstack/react-table';
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'next-usequerystate';
import { Button, InputSelect } from '@psu/web-component-atoms';
import { IoEyeSharp } from 'react-icons/io5';
export const AdminMasterModule: FC = (): ReactElement => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );
  const data = [
    {
      role: 'Webinar : Digital skill',
      accessRight: '20/02/2024 13.00 - 20/02/2024 14.00',
    },
    {
      role: 'Webinar : Memberdayakan Randa',
      accessRight: '25/04/2024 08.00 - 25/04/2024 11.00',
    },
    {
      role: 'Webinar : Pentingnya Jerapah',
      accessRight: '21/02/2024 12.00 - 21/02/2024 14.00',
    },
  ];
  const columns: ColumnDef<any>[] = [
    {
      header: 'No',
      accessorKey: 'no',
      cell: ({ row }) => row.index + 1,
    },
    {
      header: 'Role',
      accessorKey: 'role',
    },
    {
      header: 'Hak Akses ',
      accessorKey: 'accessRight',
    },

    {
      header: 'Aksi',
      cell: ({ row }) => {
        return (
          <section>
            <Button variant={'primary'} size={'sm'} onClick={()=> setIsDetailModalOpen(true)}>
              <span className="flex items-center gap-x-1">
                <IoEyeSharp />
                Lihat Detail
              </span>
            </Button>
          </section>
        );
      },
    },
  ];
  return (
  <>
      <section className="flex flex-col h-full gap-y-6 mt-8 w-full">
        <DataTable
          data={data || []}
          title='Data Role'
          createAction={() => {
            setIsAddModalOpen(true);
          }}
          createLabel={'+ Tambah Role'}
          columns={columns}
          handleSearch={(e) => setSearch(e.target.value)}
          meta={{
            meta: {
              totalPage: 10,
              total: 10,
              lastPage: 10,
              currentPage: 1,
              perPage: 1,
            },
          }}
        />
      </section>
      {/* start Add role modal */}

      <Modal
        isOpen={isAddModalOpen}
        width="300px"
        height="300px"
        header={true}
        title="Randa Slayer"
        onClose={() => setIsAddModalOpen(false)}
      >
        <InputSelect />
        <InputSelect />
        <InputSelect />
      </Modal>
      {/* end add role modal */}

      {/* start detail modal */}
      <Modal
        isOpen={isDetailModalOpen}
        width="300px"
        height="300px"
        header={true}
        title="Randa Slayer"
        onClose={() => setIsDetailModalOpen(false)}
      >
        <InputSelect />
        <InputSelect />
        <InputSelect />
      </Modal>
      {/* end detail modal */}

  </>
   
  );
};
