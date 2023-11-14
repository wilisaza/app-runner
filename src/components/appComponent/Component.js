import { lazy, Suspense } from "react"
import { Box } from "@mui/material"
import Form from "./form/Form"
import OracleForm from "./oracleForm/OracleForm"

export default function Component({componentType, specification}) {
  console.log('Component Specification', specification)
  return (
    <>
      {(() => {
        switch (componentType) {
          case 'FORM':
            return <Form specification={specification} />
          case 'ORACLE_FORM':
            return <OracleForm specification={specification} />
            case 'CUSTOM_FORM':
              const CustomForm = lazy(() => import(`../../../public/${specification.route}`))     
              return (
                <Suspense fallback={<h1>Loading</h1>}>
                  <Box mt={1} sx={{ border: 1, borderColor: "grey.300", borderRadius: 1, padding: 1 }}>
                  <CustomForm specification={specification} />
                  </Box>
                </Suspense>)
          default:
            return <></>
        }
      })()}
    </>
  )
}
