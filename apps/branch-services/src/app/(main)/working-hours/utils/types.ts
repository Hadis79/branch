export type WorkingHoursException = {
  id: string;
  title: string;
};

export type WorkingHours = {
  from: string; // "HH:mm"
  to: string; // "HH:mm"
  exceptions: WorkingHoursException[];
};

export type WorkingHoursDto = {
  from: string;
  to: string;
};
