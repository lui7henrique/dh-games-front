import * as yup from 'yup'

export const schema = () => {
  return yup.object().shape({
    title: yup.string().required('Por favor, informe o título do produto.'),
    price: yup.string().required('Por favor, informe o preço do produto.'),

    description: yup
      .string()
      .required('Por favor, informe a descrição do produto.')
      .max(255, 'A descrição não pode ter mais de 255 caracteres.')
  })
}
