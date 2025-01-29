import { z } from "zod";

export const addressInput = z.object({
     street: z.string().min(1, "Street is required").max(50, "Street is too long"),
     city: z.string().min(1, "City is required").max(25, "City name is too long"),
     state: z.string().min(1, "State is required").max(25, "State name is too long"),
     pin: z.number({ message: "Pin must be a number" }),
});