export declare class Threat {
    id: string;
    vd: number;
    name: string;
    description: string;
    imageUrl: string;
    element: string;
    secondElements: any;
    skills: any;
    size: string;
    type: string;
    disturbingPresence: any;
    senses: any;
    defenses: any;
    healthPoints: any;
    vulnerabilities: any;
    attributes: any;
    displacements: any;
    actions: any;
    enigma: any;
    updateData(data: any): void;
    parseArrays(): void;
}
