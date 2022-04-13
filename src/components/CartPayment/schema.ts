import * as yup from 'yup'
import { validCPF } from '../../utils/validCPF'

export const schema = () => {
  return yup.object().shape({
    cardNumber: yup
      .string()
      .required('Por favor, insira o número do cartão')
      .test(
        'is-valid-number',
        'Por favor, informe um número de cartão válido.',
        (value) => {
          const number = value!.replace(/\D/g, '')

          return number.length === 16
        }
      ),

    cardExpiration: yup
      .string()
      .required('Por favor, insira a data de expiração')
      .test(
        'is-valid-date',
        'Por favor, informe uma data de expiração válida.',
        (value) => {
          const [month, year] = value!.split('/')

          const currentYear = String(new Date().getFullYear()).split('')
          const minimalYear = +(currentYear[2] + currentYear[3])

          console.log(minimalYear)

          return minimalYear < +year && +month < 12 && +month > 0
        }
      ),

    cardSecurityCode: yup
      .string()
      .required('Por favor, insira o código de segurança')
      .test(
        'is-valid-number',
        'Por favor, informe um código de segurança válido.',
        (value) => {
          const number = value!.replace(/\D/g, '')

          return number.length === 3
        }
      ),

    cardHolderName: yup
      .string()
      .required('Por favor, insira o nome do titular do cartão'),

    cardHolderCPF: yup
      .string()
      .required('Por favor, insira o CPF do titular do cartão')
      .test('is-valid-cpf', 'Por favor, informe um CPF válido.', (value) => {
        const cpf = value!.replace(/\D/g, '')

        return validCPF(cpf)
      })
  })
}
