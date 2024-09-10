import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { CellTip } from 'src/components/tables'
import { CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faMinusCircle, faPaperPlane, faEye } from '@fortawesome/free-solid-svg-icons'
import { CippActionsOffcanvas } from 'src/components/utilities'
import { Link, useSearchParams } from 'react-router-dom'

const EndpointAnalyticsDeviceScore = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  const Offcanvas = (row, rowIndex, formatExtraData) => {
    const [ocVisible, setOCVisible] = useState(false)
    const viewLink = `https://intune.microsoft.com/${tenant.defaultDomainName}/#view/Microsoft_Intune_Devices/DeviceSettingsMenuBlade/~/overview/mdmDeviceId/${row.id}`
    return (
      <>
        <a href={viewLink} target="_blank" rel="noopener noreferrer">
          <CButton size="sm" variant="ghost" color="success">
            <FontAwesomeIcon icon="eye" />
          </CButton>
        </a>
      </>
    )
  }

  const columns = [
    {
      name: 'Device Name',
      selector: (row) => row['deviceName'],
      sortable: true,
      exportSelector: 'deviceName',
    },
    {
      name: 'Model',
      selector: (row) => row['model'],
      sortable: true,
      exportSelector: 'model',
    },
    {
      name: 'Manufacturer',
      selector: (row) => row['manufacturer'],
      sortable: true,
      exportSelector: 'manufacturer',
    },
    {
      name: 'endpointAnalyticsScore',
      selector: (row) => row['endpointAnalyticsScore'],
      sortable: true,
      exportSelector: 'endpointAnalyticsScore',
    },
    {
      name: 'startupPerformanceScore',
      selector: (row) => row['startupPerformanceScore'],
      sortable: true,
      exportSelector: 'startupPerformanceScore',
    },
    {
      name: 'appReliabilityScore',
      selector: (row) => row['appReliabilityScore'],
      sortable: true,
      exportSelector: 'appReliabilityScore',
    },
    {
      name: 'workFromAnywhereScore',
      selector: (row) => row['workFromAnywhereScore'],
      sortable: true,
      exportSelector: 'workFromAnywhereScore',
    },
    {
      name: 'meanResourceSpikeTimeScore',
      selector: (row) => row['meanResourceSpikeTimeScore'],
      sortable: true,
      exportSelector: 'meanResourceSpikeTimeScore',
    },
    {
      name: 'batteryHealthScore',
      selector: (row) => row['batteryHealthScore'],
      sortable: true,
      exportSelector: 'batteryHealthScore',
    },
    {
      name: 'Health Status',
      selector: (row) => row['healthStatus'],
      sortable: true,
      exportSelector: 'healthStatus',
    },
    {
      name: 'Actions',
      cell: Offcanvas,
      maxWidth: '100px',
    },
  ]

  return (
    <>
      <CippPageList
        title="Device Score Report"
        capabilities={{ allTenants: false, helpContext: 'https://google.com' }}
        datatable={{
          filterlist: [
            {
              filterName: 'Health Status: needsAttention',
              filter: 'Complex: healthStatus eq needsAttention',
            },
          ],
          columns: columns,
          path: `api/ListGraphRequest`,
          reportName: `${tenant?.defaultDomainName}-EndpointAnalyticsDeviceScore-Report`,
          params: {
            TenantFilter: tenant.defaultDomainName,
            Endpoint: `deviceManagement/userExperienceAnalyticsDeviceScores`,
            $NoPagination: true,
            $top: 999,
          },
        }}
      />
    </>
  )
}

export default EndpointAnalyticsDeviceScore
