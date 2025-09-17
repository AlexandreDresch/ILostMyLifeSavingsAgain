import { currencies } from "@/constants";
import { z } from "zod";

export const UpdateUserSettingsSchema = z.object({
  currency: z.custom((val) => {
    const found = currencies.some((c) => c.value === val);
    return !!found;
  }, "Invalid currency, must be one of the predefined currencies."),
});

export type UpdateUserSettings = z.infer<typeof UpdateUserSettingsSchema>;
