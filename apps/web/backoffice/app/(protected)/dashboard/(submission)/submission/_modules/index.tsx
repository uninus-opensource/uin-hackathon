'use client';
import { FC, Fragment, ReactElement, useState } from 'react';
import { DataTable, Modal } from '@psu/web-component-organisms';
import { ColumnDef } from '@tanstack/react-table';
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'next-usequerystate';
import { IoDocumentText, IoEyeSharp } from 'react-icons/io5';
import { Button, InputSelect } from '@psu/web-component-atoms';
import { FaRegEdit } from 'react-icons/fa';
export const SubmissionModule: FC = (): ReactElement => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );
  const data = [
    {
      name: 'Webinar : Digital skill',
      periode: '20/02/2024 13.00 - 20/02/2024 14.00',
      status: 'berlangsung',
    },
    {
      name: 'Webinar : Memberdayakan Randa',
      periode: '25/04/2024 08.00 - 25/04/2024 11.00',
      status: 'disetujui kemahasiswaan',
    },
    {
      name: 'Webinar : Pentingnya Jerapah',
      periode: '21/02/2024 12.00 - 21/02/2024 14.00',
      status: 'disetujui',
    },
  ];
  const columns: ColumnDef<any>[] = [
    {
      header: 'No',
      accessorKey: 'no',
      cell: ({ row }) => row.index + 1,
    },
    {
      header: 'Nama Kegiatan',
      accessorKey: 'name',
    },
    {
      header: 'Periode Kegiatan',
      accessorKey: 'periode',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ getValue }) => {
        const value = String(getValue<string>());
        if (value === 'berlangsung') {
          return (
            <div className="bg-primary-200 text-primary-600 text-center w-full px-2 py-1 rounded-lg text-sm font-medium">
              Berlangsung
            </div>
          );
        } else if (value === 'disetujui kemahasiswaan') {
          return (
            <div className="bg-secondary-200 text-secondary-600 text-center w-full px-3 py-1 rounded-lg text-sm font-medium">
              Disetujui Kemahasiswaan
            </div>
          );
        } else if (value === 'revisi') {
          return (
            <div className="bg-secondary-300 text-secondary-700 text-center w-full px-2 py-1 rounded-lg text-sm font-medium">
              Revisi
            </div>
          );
        } else if (value === 'ditolak') {
          return (
            <div className="bg-error-200 text-error-600 text-center w-full px-2 py-1 rounded-lg text-sm font-medium">
              Ditolak
            </div>
          );
        } else {
          return (
            <div className="bg-info-200 text-info-600 text-center w-full px-2 py-1 rounded-lg text-sm font-medium">
              Disetujui
            </div>
          );
        }
      },
    },
    {
      header: 'Aksi',
      cell: ({ row }) => {
        return (
          <section className="flex gap-x-2">
            <Button variant={'primary'} size={'sm'}>
              <span className="flex items-center gap-x-1">
                <IoEyeSharp />
                Lihat Detail
              </span>
            </Button>
            <Button variant={'warning'} size={'sm'}>
              <span className="flex items-center gap-x-1 text-grey-900">
                <FaRegEdit />
                Revisi
              </span>
            </Button>
          </section>
        );
      },
    },
  ];

  return (
    <Fragment>
      <div className="flex flex-col h-full w-full gap-y-6 mt-8">
        <DataTable
          createAction={() => {
            setIsModalOpen(!isModalOpen);
          }}
          createIcon={<IoDocumentText />}
          createLabel={'Buat Pengajuan'}
          data={data || []}
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
      </div>
      <Modal
        isOpen={isModalOpen}
        width="300px"
        height="300px"
        header={true}
        title="Randa Slayer"
        onClose={() => setIsModalOpen(false)}
      >
        <InputSelect />
        <InputSelect />
        <InputSelect />
      </Modal>
    </Fragment>
  );
};
