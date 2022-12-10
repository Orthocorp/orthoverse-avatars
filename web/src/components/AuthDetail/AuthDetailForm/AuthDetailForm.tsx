import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditAuthDetailById, UpdateAuthDetailInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'




type FormAuthDetail = NonNullable<EditAuthDetailById['authDetail']>

interface AuthDetailFormProps {
  authDetail?: EditAuthDetailById['authDetail']
  onSave: (data: UpdateAuthDetailInput, id?: FormAuthDetail['id']) => void
  error: RWGqlError
  loading: boolean
}

const AuthDetailForm = (props: AuthDetailFormProps) => {
  const onSubmit = (data: FormAuthDetail) => {
  
    
    
  
    props.onSave(data, props?.authDetail?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormAuthDetail> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="nonce"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Nonce
        </Label>
        
          <TextField
            name="nonce"
            defaultValue={props.authDetail?.nonce}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="nonce" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AuthDetailForm
