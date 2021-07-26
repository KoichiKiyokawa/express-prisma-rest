import { Static, Type } from "@sinclair/typebox";

export const CreatePostDto = Type.Object(
  {
    title: Type.String(),
    body: Type.String(),
  },
  { additionalProperties: false }
);

export type TCreatePostDto = Static<typeof CreatePostDto>;
