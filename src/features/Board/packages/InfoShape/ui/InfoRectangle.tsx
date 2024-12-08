import { Controller, useForm } from 'react-hook-form'

import { type RectangleShape } from '@entities/Shape'

import { Flex } from '@shared/ui/Flex'
import { NumberInput } from '@shared/ui/Inputs/NumberInput'

type Values = {
  width: number
  height: number
  fill: string
  rotation: number
}

type Props = {
  rectangle: RectangleShape

  onSave?: (values: Values) => void
}

export const InfoRectangle = ({ rectangle, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty },
    control,
  } = useForm<Values>({})

  return (
    <Flex asChild direction={'column'} gap={12} align={'start'}>
      <form
        onSubmit={handleSubmit((values) => {
          console.log(values)
          onSave?.(values)
        })}
      >
        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <NumberInput
                minValue={30}
                maxValue={600}
                type='number'
                value={value ?? rectangle.width}
                onChange={onChange}
              />
            )
          }}
          name={'width'}
        />

        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <NumberInput
                minValue={30}
                maxValue={600}
                type='number'
                value={value ?? rectangle.height}
                onChange={onChange}
              />
            )
          }}
          name={'height'}
        />

        <input type='color' {...register('fill')} defaultValue={rectangle.fill} />

        <Controller
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <NumberInput
                minValue={0}
                maxValue={360}
                type='number'
                value={value ?? rectangle.rotation}
                onChange={onChange}
              />
            )
          }}
          name={'rotation'}
        />

        {isDirty && <button type={'submit'}>Сохранить изменения</button>}
      </form>
    </Flex>
  )
}
