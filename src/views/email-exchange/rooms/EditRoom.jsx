import React from 'react'
import {
  CCallout,
  CButton,
  CCol,
  CForm,
  CRow,
  CSpinner,
  CCard,
  CCardHeader,
  CCardTitle,
  CCardBody,
} from '@coreui/react'
import { Form } from 'react-final-form'
import { RFFCFormSelect, RFFCFormInput, RFFCFormCheck } from 'src/components/forms'
import { CippPage } from 'src/components/layout/CippPage'
import { useLazyGenericPostRequestQuery } from 'src/store/api/app'
import { useSelector } from 'react-redux'

const EditRoom = () => {
  const tenantDomain = useSelector((state) => state.app.currentTenant.defaultDomainName)

  const [genericPostRequest, postResults] = useLazyGenericPostRequestQuery()
  const onSubmit = (values) => {
    const shippedValues = {
      tenantID: tenantDomain,
      emailAddress: values.emailAddress,
      displayName: values.displayName,
      geoCoordinates: values.geoCoordinates,
      phone: values.phone,
      placeId: values.placeId,
      nickname: values.nickname,
      building: values.building,
      floorNumber: values.floorNumber,
      floorLabel: values.floorLabel,
      label: values.label,
      capacity: values.capacity,
      bookingType: values.bookingType,
      audioDeviceName: values.audioDeviceName,
      videoDeviceName: values.videoDeviceName,
      displayDeviceName: values.displayDeviceName,
      isWheelChairAccessible: values.isWheelChairAccessible,
      tags: values.tags,
      address: {
        type: values.address.type,
        postOfficeBox: values.address.postOfficeBox,
        street: values.address.street,
        city: values.address.city,
        state: values.address.state,
        countryOrRegion: values.address.countryOrRegion,
        postalCode: values.address.postalCode,
      },
    }
    genericPostRequest({ path: '/api/EditRoom', values: shippedValues })
  }
  return (
    <CippPage title="Create Room">
      <CCard className="content-card">
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <CCardTitle>Create Room</CCardTitle>
        </CCardHeader>
        <CCardBody>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, values }) => {
              return (
                <CForm onSubmit={handleSubmit}>
                  <RFFCFormInput
                    name="emailAddress"
                    label="Email Address"
                    type="email"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="displayName"
                    label="Display Name"
                    type="text"
                    isRequired={true}
                  />
                  <RFFCFormInput
                    name="geoCoordinates"
                    label="Geo Coordinates"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="phone"
                    label="Phone"
                    type="number"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="nickname"
                    label="Nickname"
                    type="text"
                    isRequired={true}
                  />
                  <RFFCFormInput
                    name="building"
                    label="Building"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="floorNumber"
                    label="Floor Number"
                    type="numer"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="floorLabel"
                    label="Floor Label"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="label"
                    label="Label"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="capacity"
                    label="Capacity"
                    type="number"
                    isRequired={false}
                  />
                  <RFFCFormSelect
                    name="bookingType"
                    label="Booking Type"
                    values={[
                      { value: 'standard', label: 'standard' },
                      { value: 'reserved', label: 'reserved' },
                    ]}
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="audioDeviceName"
                    label="Audio Device Name"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="videoDeviceName"
                    label="Video Device Name"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="displayDeviceName"
                    label="Display Device Name"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormCheck
                    name="isWheelChairAccessible"
                    label="Is Wheelchair Accessible"
                    type="checkbox"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="tags"
                    label="Tags"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="address.postOfficeBox"
                    label="Post Office Box"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="address.street"
                    label="Street"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="address.city"
                    label="City"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="address.state"
                    label="State"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="address.countryOrRegion"
                    label="Country or Region"
                    type="text"
                    isRequired={false}
                  />
                  <RFFCFormInput
                    name="address.postalCode"
                    label="Postal Code"
                    type="text"
                    isRequired={false}
                  />
                  <CRow className="mb-3">
                    <CCol md={6}>
                      <CButton type="submit" disabled={submitting}>
                        Edit Room
                      </CButton>
                    </CCol>
                  </CRow>
                  {postResults.isFetching && (
                    <CCallout color="success">
                      <CSpinner />
                    </CCallout>
                  )}
                  {postResults.isSuccess && (
                    <CCallout color="success">{postResults.data.Results}</CCallout>
                  )}
                </CForm>
              )
            }}
          />
        </CCardBody>
      </CCard>
    </CippPage>
  )
}

export default EditRoom
