export type TUser = {
  idUser: number;
  name: string;
  email: string;
  cellphone: string;
  companyName: string;
  jobPosition: string;
  idUserCategory: number;
  changePassword: boolean;
  userCategoryName: string;
};

export type TStats = {
  total: number;
  resueltos: number;
  progreso: number;
  espera: number;
};
