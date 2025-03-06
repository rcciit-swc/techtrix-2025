import { Filter } from '@/components/admin/approve/EventFilters'
import OnSpot from '@/components/admin/approve/OnSpot'
import RegistrarTable from '@/components/admin/approve/RegistrarTable'
import TableSkeleton from '@/components/admin/approve/TableSkeleton'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div className="w-full mt-[150px] px-10 bg-black max-w-7xl mx-auto">
      <h1 className="text-3xl font-sargento mb-4 text-white">
        Registrations
      </h1>
        <OnSpot />
      <Suspense fallback={<TableSkeleton />}>
        <RegistrarTable />
      </Suspense>
    </div>
  )
}

export default page
