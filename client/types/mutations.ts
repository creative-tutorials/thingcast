import { UseMutationResult } from "@tanstack/react-query";

export type DeleteEventParams = {
  id: string;
  evntid: string;
};

export type UpdateEventParams = Pick<DeleteEventParams, "id" | "evntid"> & {
  title: string;
  description: string;
  url: string;
  scheduled: string;
};

export type deleteMutation = UseMutationResult<
  any,
  unknown,
  DeleteEventParams,
  unknown
>;
export type updateMutatuion = UseMutationResult<
  any,
  unknown,
  UpdateEventParams,
  unknown
>;
