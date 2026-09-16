export const formatCount = (value: number): string => value.toLocaleString('fa-IR');

type CalculateRowParams = {
  index: number;
  pagination?: {
    page?: number;
    size?: number;
  };
};

export function calculateRow({ index, pagination }: CalculateRowParams): number {
  const { page = 1, size = 10 } = pagination ?? {};

  return (page - 1) * size + index + 1;
}
