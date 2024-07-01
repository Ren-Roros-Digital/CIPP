import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CCollapse,
  CForm,
  CRow,
} from '@coreui/react'
import { faChevronDown, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Form } from 'react-final-form'
import { useSelector } from 'react-redux'
import { CippPageList } from 'src/components/layout'
import { CellTip } from 'src/components/tables'
import { RFFCFormInput } from 'src/components/forms'
import useQuery from 'src/hooks/useQuery'

const columns = [
  {
    name: 'Detected Date',
    selector: (row) => row['detectedDateTime'],
    sortable: true,
    exportSelector: 'detectedDateTime',
    minWidth: '155px',
  },
  {
    name: 'User Principal Name',
    selector: (row) => row['userPrincipalName'],
    sortable: true,
    exportSelector: 'userPrincipalName',
    minWidth: '200px',
  },
  {
    name: 'Location',
    selector: (row) => `${row.location?.city} - ${row.location?.countryOrRegion}`,
    sortable: true,
    exportSelector: 'Location',
    cell: (row) => CellTip(`${row.location?.city} - ${row.location?.countryOrRegion}`),
    minWidth: '40px',
  },
  {
    name: 'IP Address',
    selector: (row) => row['ipAddress'],
    sortable: true,
    exportSelector: 'ipAddress',
    minWidth: '40px',
  },
  {
    name: 'Risk State',
    selector: (row) => row['riskState'],
    sortable: true,
    exportSelector: 'riskState',
    minWidth: '40px',
  },
  {
    name: 'Risk Detail',
    selector: (row) => row['riskDetail'],
    sortable: true,
    exportSelector: 'riskDetail',
    minWidth: '200px',
  },
  {
    name: 'Risk Level',
    selector: (row) => row['riskLevel'],
    sortable: true,
    exportSelector: 'riskLevel',
    minWidth: '30px',
  },
  {
    name: 'Risk Type',
    selector: (row) => row['riskType'],
    sortable: true,
    exportSelector: 'riskType',
    minWidth: '150px',
  },
  {
    name: 'Risk Event Type',
    selector: (row) => row['riskEventType'],
    sortable: true,
    exportSelector: 'riskEventType',
    minWidth: '150px',
  },
  {
    name: 'Detection Type',
    selector: (row) => row['detectionTimingType'],
    sortable: true,
    exportSelector: 'detectionTimingType',
    minWidth: '50px',
  },
  {
    name: 'Activity',
    selector: (row) => row['activity'],
    sortable: true,
    exportSelector: 'activity',
    minWidth: '40px',
  },
]

const RiskDetections = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  let query = useQuery()
  const filter = query.get('filter')
  const DateFilter = query.get('DateFilter')
  const [searchParams, setSearchParams] = useState({})
  const [visibleA, setVisibleA] = useState(true)

  const handleSubmit = async (values) => {
    Object.keys(values).filter(function (x) {
      if (values[x] === null) {
        delete values[x]
      }
      return null
    })
    const shippedValues = {
      SearchNow: true,
      ...values,
    }
    setSearchParams(shippedValues)
  }

  return (
    <>
      <CRow>
        <CCol>
          <CCard className="options-card">
            <CCardHeader>
              <CCardTitle className="d-flex justify-content-between">
                Risk Detection Settings
                <CButton
                  size="sm"
                  variant="ghost"
                  className="stretched-link"
                  onClick={() => setVisibleA(!visibleA)}
                >
                  <FontAwesomeIcon icon={visibleA ? faChevronDown : faChevronRight} />
                </CButton>
              </CCardTitle>
            </CCardHeader>
          </CCard>
          <CCollapse visible={visibleA}>
            <CCard className="options-card">
              <CCardHeader></CCardHeader>
              <CCardBody>
                <Form
                  initialValues={{
                    filter: filter,
                    DateFilter: DateFilter,
                  }}
                  onSubmit={handleSubmit}
                  render={({ handleSubmit, submitting, values }) => {
                    return (
                      <CForm onSubmit={handleSubmit}>
                        <CRow>
                          <CCol>
                            <RFFCFormInput type="number" name="Days" label="Days" placeholder="7" />
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <RFFCFormInput
                              type="text"
                              name="filter"
                              label="Custom Filter"
                              placeholder="riskState eq atRisk"
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-3">
                          <CCol>
                            <CButton type="submit" disabled={submitting}>
                              <FontAwesomeIcon icon={faSearch} className="me-2" />
                              Search
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )
                  }}
                />
              </CCardBody>
            </CCard>
          </CCollapse>
        </CCol>
      </CRow>
      <hr />
      <CippPageList
        title="Risk Detection Report"
        capabilities={{ allTenants: true, helpContext: 'https://google.com' }}
        datatable={{
          filterlist: [
            {
              filterName: 'State: atRisk',
              filter: 'Complex: riskState eq atRisk',
            },
            {
              filterName: 'State: confirmedCompromised',
              filter: 'Complex: riskState eq confirmedCompromised',
            },
            {
              filterName: 'State: confirmedSafe',
              filter: 'Complex: riskState eq confirmedSafe',
            },
            {
              filterName: 'State: dismissed',
              filter: 'Complex: riskState eq dismissed',
            },
            {
              filterName: 'State: remediated',
              filter: 'Complex: riskState eq remediated',
            },
            {
              filterName: 'State: unknownFutureValue',
              filter: 'Complex: riskState eq unknownFutureValue',
            },
          ],
          columns: columns,
          path: `api/ListGraphRequest`,
          reportName: `${tenant?.defaultDomainName}-RiskDetections-Report`,
          params: {
            TenantFilter: tenant?.defaultDomainName,
            Endpoint: `identityProtection/riskDetections`,
            $count: true,
            $orderby: 'detectedDateTime',
          },
        }}
      />
    </>
  )
}

export default RiskDetections
