import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "threat" })
export class Threat {
  @Column({ primary: true, type: "varchar", length: 255 })
  id: string;
  @Column({ default: 0 })
  vd: number;
  @Column({ default: "" })
  name: string;
  @Column({ default: null, type: "text" })
  description: string;
  @Column({ default: "" })
  imageUrl: string;
  @Column({ default: "" })
  element: string;
  @Column({ default: null, type: "text" })
  secondElements: any;
  @Column({ default: null, type: "text" })
  skills: any;
  @Column({ default: "" })
  size: string;
  @Column({ default: "" })
  type: string;
  @Column({ default: null, type: "text" })
  disturbingPresence: any;
  @Column({ default: null, type: "text" })
  senses: any;
  @Column({ default: null, type: "text" })
  defenses: any;
  @Column({ default: null, type: "text" })
  healthPoints: any;
  @Column({ default: null, type: "text" })
  vulnerabilities: any;
  @Column({ default: null, type: "text" })
  attributes: any;
  @Column({ default: null, type: "text" })
  displacements: any;
  @Column({ default: null, type: "text" })
  actions: any;
  @Column({ default: null, type: "text" })
  enigma: any;

  updateData(data: any) {
    this.vd = data.vd;
    this.name = data.name;
    this.description = data.description;
    this.imageUrl = data.imageUrl;
    this.element = data.element;
    this.secondElements = JSON.stringify(data.secondElements);
    this.skills = JSON.stringify(data.skills);
    this.size = data.size;
    this.type = data.type;
    this.disturbingPresence = JSON.stringify(data.disturbingPresence);
    this.senses = JSON.stringify(data.senses);
    this.defenses = JSON.stringify(data.defenses);
    this.healthPoints = JSON.stringify(data.healthPoints);
    this.vulnerabilities = JSON.stringify(data.vulnerabilities);
    this.attributes = JSON.stringify(data.attributes);
    this.displacements = JSON.stringify(data.displacements);
    this.actions = JSON.stringify(data.actions);
    this.enigma = JSON.stringify(data.enigma);
  }

  parseArrays() {
    this.skills = JSON.parse(this.skills);
    this.attributes = JSON.parse(this.attributes);
    this.secondElements = JSON.parse(this.secondElements);
    this.disturbingPresence = JSON.parse(this.disturbingPresence);
    this.senses = JSON.parse(this.senses);
    this.defenses = JSON.parse(this.defenses);
    this.healthPoints = JSON.parse(this.healthPoints);
    this.vulnerabilities = JSON.parse(this.vulnerabilities);
    this.displacements = JSON.parse(this.displacements);
    this.actions = JSON.parse(this.actions);
    this.enigma = JSON.parse(this.enigma);
  }
}
