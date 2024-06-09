export type TUserCategories = "Administrator" | "User" | "Support";

export type TTicketPriorities = "BAJA" | "IMPORTANTE" | "CRITICO";

export type TTicketStates = "EN PROGRESO" | "EN ESPERA" | "RESUELTO";

export type TUser = {
  idUser: number;
  name: string;
  email: string;
  cellphone: string;
  companyName: string;
  jobPosition: string;
  idUserCategory: number;
  changePassword: boolean;
  userCategoryName: TUserCategories;
};

export type TUserResponse = {
  $values: TUser[];
};

export type TStats = {
  total: number;
  resueltos: number;
  progreso: number;
  espera: number;
};

type TBackupFiles = {
  $id: "4";
  IdBackupFile: 2;
  IdTicket: 2;
  Name: "feature_request_backup_20240602.bak";
  IdTicketNavigation: {
    $ref: "2";
  };
};

export type TTicketValue = {
  IdTicket: number;
  IdUser: number;
  IdEmployee: number | undefined;
  Name: string;
  Description: string;
  Priority: TTicketPriorities;
  State: TTicketStates;
  CreationDate: string;
  IdEmployeeNavigation?: {
    Name: string;
  };
  BackupFiles: {
    $values: TBackupFiles[];
  };
  TicketAdditionalTasks: {
    $id: "5";
    $values: [];
  };
  TicketComments: {
    $id: "6";
    $values: {
      Comment: string;
      Date: string;
    }[];
  };
};

export type TTicket = {
  $id: "1";
  $values: TTicketValue[];
};

export type TEmployee = {
  idUser: number;
  idUserCategory: number;
  name: string;
  email: string;
  cellphone: string;
  companyName: string;
  jobPosition: string;
};
