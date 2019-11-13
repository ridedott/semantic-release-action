import * as transform from './transform';
export declare const options: {
    parserOpts: {
        mergeCorrespondence: string[];
        mergePattern: RegExp;
    };
    plugins: (string | (string | {
        releaseRules: {
            release: string;
            type: string;
        }[];
    })[] | (string | {
        assets: string[];
        message: string;
    })[] | (string | {
        failComment: boolean;
        releasedLabels: boolean;
        successComment: boolean;
    })[])[];
    releaseRules: {
        release: string;
        type: string;
    }[];
    writerOpts: {
        transform: typeof transform;
    };
};
//# sourceMappingURL=angularPresetOverride.d.ts.map