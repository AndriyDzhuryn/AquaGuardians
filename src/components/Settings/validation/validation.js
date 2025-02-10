import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(32, 'Ім’я занадто довге')
    .required('Ім’я є обов’язковим'),

  email: Yup.string()
    .email('Некоректний формат email')
    .required('Email є обов’язковим'),

  password: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .max(64, 'Пароль занадто довгий')
    .required('Пароль є обов’язковим'),

  oldPassword: Yup.string()
    .required('Пароль є обов’язковим')
    .test('repeatPassword-match', 'Паролі не співпадають', function (value) {
      const { newPassword } = this.parent;
      if (newPassword && newPassword.length > 0) {
        return value && value === newPassword;
      }
      return true;
    }),
});
