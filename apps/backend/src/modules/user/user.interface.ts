import type { CERTIFICATION_LEVEL, ROLE, STATUS,  } from "@/types/types";

export interface IUser {
	name: string;
	email: string;
	password: string;
	role: ROLE;	
	isVerified: boolean;
	status: STATUS;
	certificationLevel: CERTIFICATION_LEVEL;	
}
