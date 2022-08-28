import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "threat" })
export class Threat {
  @Column({ primary: true, type: "varchar", length: 255 })
  id: string;
  @Column({ default: 0 })
  vd: number;
  @Column({ default: "" })
  name: string;
  @Column({ default: null, type: "longtext" })
  description: string;
  @Column({ default: "" })
  imageUrl: string;
  @Column({ default: "" })
  element: string;
  @Column({ default: null, type: "longtext" })
  secondElements: any;
  @Column({ default: null, type: "longtext" })
  skills: any;
  @Column({ default: "" })
  size: string;
  @Column({ default: "" })
  type: string;
  @Column({ default: null, type: "longtext" })
  disturbingPresence: any;
  @Column({ default: null, type: "longtext" })
  senses: any;
  @Column({ default: null, type: "longtext" })
  defenses: any;
  @Column({ default: null, type: "longtext" })
  healthPoints: any;
  @Column({ default: null, type: "longtext" })
  vulnerabilities: any;
  @Column({ default: null, type: "longtext" })
  attributes: any;
  @Column({ default: null, type: "longtext" })
  displacements: any;
  @Column({ default: null, type: "longtext" })
  actions: any;
  @Column({ default: null, type: "longtext" })
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
