import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(32, "Ім'я занадто довге")
    .required("Ім'я є обов'язковим"),

  email: Yup.string()
    .email('Некоректний формат email')
    .required("Email є обов'язковим"),

  oldPassword: Yup.string(),

  password: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .max(64, 'Пароль занадто довгий'),

  repeatPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Паролі не співпадають'
  ),
});
