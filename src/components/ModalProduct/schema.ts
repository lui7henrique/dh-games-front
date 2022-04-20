import * as yup from 'yup'

export const schema = () => {
  return yup.object().shape({
    title: yup.string().required('Por favor, informe o título do produto.'),
    price: yup
      .string()
      .required('Por favor, informe o preço do produto.')
      .test(
        'is-valid-number',
        'Por favor, informe um preço válido.',
        (value) => {
          const number = +value!

          return number >= 0 && number < 10000
        }
      ),

    description: yup
      .string()
      .required('Por favor, informe a descrição do produto.')
      .max(255, 'A descrição não pode ter mais de 255 caracteres.'),

    image: yup.string().required('Por favor, informe a imagem do produto.'),

    category: yup
      .string()
      .required('Por favor, informe a categoria do produto.'),

    operatingSystem: yup
      .string()
      .required('Por favor, informe o sistema operacional.')
  })
}
