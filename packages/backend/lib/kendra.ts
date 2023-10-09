import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kendra from 'aws-cdk-lib/aws-kendra';
import * as iam from 'aws-cdk-lib/aws-iam';

export enum EditionType{
  DEVELOPER_EDITION = "DEVELOPER_EDITION",
  ENTERPRISE_EDITION = "ENTERPRISE_EDITION"
}

export interface CustomProps {

  s3_Source_Bucket: s3.Bucket; // Source s3 bucket
  Index_name: string;
  edition: EditionType;
  Data_Source_name: string;
  Data_Source_desciption: string;
  attribute_metadata: string;

}

export class Kendra extends Construct {

  // public read only values
  public readonly Kendra_Index: kendra.CfnIndex
  public readonly Kendra_DataSource: kendra.CfnDataSource

    constructor(scope: Construct, id: string, props: CustomProps) {
      super(scope, id);

      // IAM role for the Kendra Index
      const Kendra_IAM_role = new iam.Role(this, 'kendra_index_role', {
        assumedBy: new iam.ServicePrincipal('kendra.amazonaws.com')
      });

      // adding policy to Kendra role
      Kendra_IAM_role.addToPolicy(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            "logs:*",
            "apigateway:*",
            "s3:*",
            "kendra:*"
          ],
          resources: ["*"],
        })
      )

      // Creating the Kendra Index 
      this.Kendra_Index = new kendra.CfnIndex(this, "Kendra_Index", {
        edition: props.edition,
        name: props.Index_name,
        roleArn: Kendra_IAM_role.roleArn,
        documentMetadataConfigurations: [{
          name: props.attribute_metadata,
          type: 'STRING_VALUE',
          // the properties below are optional
          search: {
            displayable: true,
            facetable: true,
            searchable: true,
            sortable: false,
          },
        }],
      })

      // this.Kendra_Index_ID = Kendra_Index.attrId

      // Creating S3 Data Source  for Kendra Index
      this.Kendra_DataSource = new kendra.CfnDataSource(this, "Kendra_s3_connector", {
        indexId: this.Kendra_Index.attrId,
        name: props.Data_Source_name,
        type: "S3",
        dataSourceConfiguration:{
          s3Configuration:{
            bucketName: props.s3_Source_Bucket.bucketName
          }
        },
        description: props.Data_Source_desciption,
        roleArn: Kendra_IAM_role.roleArn
      })

      // this.Kendra_Data_source_id = Kendra_DataSource.indexId


    }
}
